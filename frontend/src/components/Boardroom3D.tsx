import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Agent, AgentId } from '../types/boardroom';

interface Boardroom3DProps {
  agents: Agent[];
  activeSpeakerId: AgentId | null;
  onSelectAgent?: (id: AgentId) => void;
}

// 3D Avatar for an Executive
const ExecutiveAvatar: React.FC<{
  agent: Agent;
  isSpeaking: boolean;
  onSelect?: () => void;
}> = ({ agent, isSpeaking, onSelect }) => {
  const meshRef = useRef<THREE.Group>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);

  // Subtle floating and speaking animation
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    if (isSpeaking) {
      meshRef.current.position.y = 0.15 + Math.sin(t * 4) * 0.05;
      if (pulseRingRef.current) {
        const scale = 1 + Math.sin(t * 6) * 0.15;
        pulseRingRef.current.scale.set(scale, scale, 1);
        const mat = pulseRingRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.5 + Math.sin(t * 6) * 0.3;
      }
    } else {
      meshRef.current.position.y = 0;
    }
  });

  const getVoteColor = () => {
    switch (agent.currentVote) {
      case 'APPROVE': return '#10B981';
      case 'REJECT': return '#EF4444';
      case 'CONDITIONAL': return '#F59E0B';
      default: return '#64748B';
    }
  };

  return (
    <group
      position={agent.tablePosition}
      rotation={[0, agent.rotationY, 0]}
      onClick={onSelect}
    >
      <group ref={meshRef}>
        {/* Executive Chair */}
        <group position={[0, 0, 0.35]}>
          {/* Chair Seat */}
          <mesh position={[0, 0.45, 0]}>
            <boxGeometry args={[0.7, 0.1, 0.65]} />
            <meshStandardMaterial color="#111827" roughness={0.7} metalness={0.2} />
          </mesh>
          {/* Chair Backrest */}
          <mesh position={[0, 0.95, 0.28]} rotation={[-0.1, 0, 0]}>
            <boxGeometry args={[0.65, 0.9, 0.1]} />
            <meshStandardMaterial color="#111827" roughness={0.7} metalness={0.2} />
          </mesh>
          {/* Headrest */}
          <mesh position={[0, 1.45, 0.23]}>
            <boxGeometry args={[0.45, 0.2, 0.08]} />
            <meshStandardMaterial color="#1E293B" roughness={0.6} />
          </mesh>
          {/* Chair Stem & Base */}
          <mesh position={[0, 0.22, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.45, 12]} />
            <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.04, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>

        {/* Executive Body/Torso */}
        <mesh position={[0, 0.9, 0.35]}>
          <cylinderGeometry args={[0.22, 0.28, 0.7, 16]} />
          <meshStandardMaterial
            color={isSpeaking ? agent.color : '#1E293B'}
            roughness={0.4}
            metalness={0.3}
          />
        </mesh>

        {/* Head */}
        <mesh position={[0, 1.42, 0.35]}>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial
            color={isSpeaking ? '#F8FAFC' : '#CBD5E1'}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>

        {/* Department Badge Collar */}
        <mesh position={[0, 1.25, 0.35]}>
          <cylinderGeometry args={[0.24, 0.24, 0.06, 20]} />
          <meshStandardMaterial
            color={agent.color}
            emissive={agent.color}
            emissiveIntensity={isSpeaking ? 0.9 : 0.3}
          />
        </mesh>

        {/* Holographic Speaking Ring on Floor */}
        {isSpeaking && (
          <mesh
            ref={pulseRingRef}
            position={[0, 0.02, 0.35]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <ringGeometry args={[0.65, 0.85, 32]} />
            <meshBasicMaterial
              color={agent.color}
              transparent
              opacity={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Vote Indicator Sphere at the table edge */}
        <mesh position={[0, 0.88, -0.45]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color={getVoteColor()}
            emissive={getVoteColor()}
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* 3D Floating Nameplate & Role */}
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
          <group position={[0, 1.85, 0.35]}>
            <Text
              fontSize={0.16}
              color={isSpeaking ? '#60A5FA' : '#E2E8F0'}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#090D16"
            >
              {agent.shortTitle}
            </Text>
            <Text
              position={[0, -0.14, 0]}
              fontSize={0.09}
              color={getVoteColor()}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.015}
              outlineColor="#090D16"
            >
              {agent.currentVote}
            </Text>
          </group>
        </Float>
      </group>
    </group>
  );
};

// Executive Conference Table
const BoardroomTable: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Table Surface (Futuristic Oval) */}
      <mesh position={[0, 0.78, 0]} scale={[1.4, 1, 2.3]}>
        <cylinderGeometry args={[1.55, 1.55, 0.08, 48]} />
        <meshStandardMaterial
          color="#0B0F19"
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* Table Rim Glow Ring */}
      <mesh position={[0, 0.82, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.38, 2.28, 1]}>
        <ringGeometry args={[1.48, 1.52, 48]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Center Holographic Projector Disc */}
      <mesh position={[0, 0.83, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.03, 32]} />
        <meshStandardMaterial
          color="#1E293B"
          metalness={0.9}
          roughness={0.2}
          emissive="#3B82F6"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Center Holographic Pillar Light */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.02, 0.35, 0.8, 32, 1, true]} />
        <meshBasicMaterial
          color="#60A5FA"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating Center Brand Text */}
      <Text
        position={[0, 1.55, 0]}
        fontSize={0.14}
        color="#93C5FD"
        anchorX="center"
        anchorY="middle"
      >
        BOARDMIND AI
      </Text>

      {/* Table Pillar Base */}
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.7, 0.9, 0.76, 32]} />
        <meshStandardMaterial color="#111827" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
};

// Floor with Grid & Executive Perimeter
const BoardroomRoom: React.FC = () => {
  return (
    <group>
      {/* Reflective Dark Floor */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial
          color="#06080E"
          roughness={0.65}
          metalness={0.4}
        />
      </mesh>

      {/* Concentric Decorative Rings */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.8, 3.84, 64]} />
        <meshBasicMaterial color="#1E293B" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.8, 4.83, 64]} />
        <meshBasicMaterial color="#0F172A" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Observer / Chairman Seat (Head of the table facing north) */}
      <group position={[0, 0, 4.2]} rotation={[0, Math.PI, 0]}>
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[0.8, 0.1, 0.7]} />
          <meshStandardMaterial color="#1E1B4B" roughness={0.5} />
        </mesh>
        <mesh position={[0, 1.05, 0.3]}>
          <boxGeometry args={[0.75, 1.1, 0.1]} />
          <meshStandardMaterial color="#312E81" roughness={0.5} />
        </mesh>
        <Text
          position={[0, 1.8, 0]}
          fontSize={0.14}
          color="#A5B4FC"
          anchorX="center"
          anchorY="middle"
        >
          HUMAN CHAIR (YOU)
        </Text>
      </group>
    </group>
  );
};

export const Boardroom3D: React.FC<Boardroom3DProps> = ({
  agents,
  activeSpeakerId,
  onSelectAgent
}) => {
  const activeAgent = agents.find((a) => a.id === activeSpeakerId);

  return (
    <div className="relative w-full h-full min-h-[440px] rounded-2xl overflow-hidden border border-slate-800/80 bg-gradient-to-b from-[#0B0F19] to-[#05070B] shadow-2xl">
      {/* Overlay Status Pill */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-slate-300 font-medium">3D Executive Chamber</span>
        <span className="text-slate-500">|</span>
        <span className="text-blue-400">
          {activeAgent ? `Floor: ${activeAgent.name} (${activeAgent.shortTitle})` : 'All Members Seated'}
        </span>
      </div>

      {/* Camera Guidance Helper */}
      <div className="absolute bottom-3 right-4 z-10 text-[11px] text-slate-400/80 bg-slate-900/70 px-2.5 py-1 rounded-md border border-slate-800 backdrop-blur pointer-events-none">
        Left Click + Drag: Orbit Camera • Scroll: Zoom
      </div>

      {/* WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 6.2, 7.8], fov: 42 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} />
        <directionalLight position={[-5, 8, -5]} intensity={0.6} color="#60A5FA" />
        
        {/* Dynamic Spotlight on Active Speaker */}
        {activeAgent && (
          <spotLight
            position={[activeAgent.tablePosition[0] * 1.5, 6, activeAgent.tablePosition[2] * 1.5]}
            target-position={activeAgent.tablePosition}
            intensity={4.5}
            color={activeAgent.color}
            angle={0.45}
            penumbra={0.6}
          />
        )}

        <BoardroomRoom />
        <BoardroomTable />

        {/* 6 Executive Members */}
        {agents.map((agent) => (
          <ExecutiveAvatar
            key={agent.id}
            agent={agent}
            isSpeaking={agent.id === activeSpeakerId}
            onSelect={() => onSelectAgent?.(agent.id)}
          />
        ))}

        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={3.8}
          maxDistance={14}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};
