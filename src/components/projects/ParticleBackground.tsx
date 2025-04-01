
import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  mousePosition?: { x: number; y: number } | null;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ mousePosition }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const textElement = textRef.current;
    
    if (!canvas || !textElement) return;

    // Initialize WebGL context with proper typing
    const gl = canvas.getContext('webgl') as WebGLRenderingContext || 
               canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    
    if (!gl) {
      console.error('WebGL not supported in your browser');
      return;
    }

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Vertex shader
    const vsSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
        gl_PointSize = 3.0;
      }
    `;

    // Fragment shader
    const fsSource = `
      precision mediump float;
      uniform vec3 uColor;
      void main() {
        gl_FragColor = vec4(uColor, 1.0);
      }
    `;

    // Compile shader
    function compileShader(source: string, type: number) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    // Create program
    const vertexShader = compileShader(vsSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fsSource, gl.FRAGMENT_SHADER);
    
    if (!vertexShader || !fragmentShader) return;
    
    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Create particles
    const particleCount = 300;
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: [number, number, number];
    }
    
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        vx: Math.random() * 0.01 - 0.005,
        vy: Math.random() * 0.01 - 0.005,
        color: [Math.random(), Math.random(), Math.random()]
      });
    }

    // Particle positions and colors
    const positions = new Float32Array(particleCount * 2);
    const colors = new Float32Array(particleCount * 3);

    // Buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    // Attributes
    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    
    const uColor = gl.getUniformLocation(program, 'uColor');

    // Animation
    let time = 0;
    let animationFrameId: number;
    
    function animate() {
      time += 0.01;
      
      // Update loading text
      if (textElement) {
        textElement.style.opacity = (0.7 + 0.3 * Math.sin(time * 2)).toString();
      }
      
      // Update particles
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        
        // Mouse interaction if available
        if (mousePosition) {
          const mouseX = mousePosition.x / window.innerWidth * 2 - 1;
          const mouseY = -(mousePosition.y / window.innerHeight * 2 - 1);
          
          // Calculate distance between particle and mouse
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Apply slight attraction to mouse position
          if (distance < 0.5) {
            p.vx += dx * 0.0001 / Math.max(0.1, distance);
            p.vy += dy * 0.0001 / Math.max(0.1, distance);
          }
        }
        
        // Particle movement
        p.x += p.vx;
        p.y += p.vy;
        
        // Boundary collision
        if (p.x < -1 || p.x > 1) p.vx *= -1;
        if (p.y < -1 || p.y > 1) p.vy *= -1;
        
        // Speed limit
        const maxSpeed = 0.015;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }
        
        // Update positions
        positions[i * 2] = p.x;
        positions[i * 2 + 1] = p.y;
        
        // Colors - purple/blue gradient
        colors[i * 3] = 0.5 + 0.3 * Math.sin(time + i * 0.01); // R
        colors[i * 3 + 1] = 0.2 + 0.2 * Math.sin(time * 1.1 + i * 0.01); // G
        colors[i * 3 + 2] = 0.8 + 0.2 * Math.sin(time * 1.2 + i * 0.01); // B
      }
      
      // Render
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      // Update buffers
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
      
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, colors, gl.DYNAMIC_DRAW);
      
      // Draw particles
      for (let i = 0; i < particleCount; i++) {
        if (uColor) {
          gl.uniform3f(uColor, colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2]);
        }
        gl.drawArrays(gl.POINTS, i, 1);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      if (program) gl.deleteProgram(program);
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (colorBuffer) gl.deleteBuffer(colorBuffer);
    };
  }, [mousePosition]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute w-full h-full object-cover"
      />
      <div 
        ref={textRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold text-center opacity-50"
      >
        A-K Project
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-40" />
    </div>
  );
};

export default ParticleBackground;
