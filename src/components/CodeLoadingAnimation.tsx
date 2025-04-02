
import React, { useEffect, useRef } from 'react';

interface CodeLoadingAnimationProps {
  duration?: number;
  onComplete?: () => void;
}

const CodeLoadingAnimation: React.FC<CodeLoadingAnimationProps> = ({ 
  duration = 5000, 
  onComplete 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const codeLines = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Setup WebGL
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') as WebGLRenderingContext;
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Shader sources
    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
          gl_Position = vec4(aPosition, 0.0, 1.0);
          gl_PointSize = 4.0;
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec3 uColor;
      void main() {
          gl_FragColor = vec4(uColor, 1.0);
      }
    `;

    // Compile shader
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) {
        console.error('Failed to create shader');
        return null;
      }
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    };

    // Create shader program
    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    
    if (!vertexShader || !fragmentShader) {
      return;
    }
    
    const program = gl.createProgram();
    if (!program) {
      console.error('Failed to create program');
      return;
    }
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }
    
    gl.useProgram(program);

    // Create particles
    const particleCount = 400;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: [number, number, number];
    }[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        vx: (Math.random() * 0.01 - 0.005) * 2,
        vy: (Math.random() * 0.01 - 0.005) * 2,
        color: [Math.random(), Math.random(), Math.random()]
      });
    }

    // Position buffer
    const positions = new Float32Array(particleCount * 2);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
    // Attribute location
    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    
    // Uniform location
    const uColor = gl.getUniformLocation(program, 'uColor');

    // Animation loop
    let animationId: number;
    let startTime = Date.now();
    let time = 0;

    const animate = () => {
      time += 0.01;
      const elapsedTime = Date.now() - startTime;
      
      // Update particles
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Boundary check
        if (p.x < -1 || p.x > 1) p.vx *= -1;
        if (p.y < -1 || p.y > 1) p.vy *= -1;
        
        // Update buffer
        positions[i * 2] = p.x;
        positions[i * 2 + 1] = p.y;
      }
      
      // Clear and prepare
      gl.clearColor(0.05, 0.05, 0.1, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      // Update position buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
      
      // Draw particles
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        const r = 0.5 + 0.5 * Math.sin(time + i * 0.05);
        const g = 0.5 + 0.5 * Math.cos(time * 1.3 + i * 0.05);
        const b = 0.7 + 0.3 * Math.sin(time * 0.7 + i * 0.05);
        
        gl.uniform3f(uColor, r, g, b);
        gl.drawArrays(gl.POINTS, i, 1);
      }
      
      // Continue animation if not complete
      if (elapsedTime < duration) {
        animationId = requestAnimationFrame(animate);
      } else if (onComplete) {
        onComplete();
      }
    };
    
    animationId = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
      
      if (gl) {
        gl.deleteProgram(program);
        if (vertexShader) gl.deleteShader(vertexShader);
        if (fragmentShader) gl.deleteShader(fragmentShader);
        if (positionBuffer) gl.deleteBuffer(positionBuffer);
      }
    };
  }, [duration, onComplete]);

  useEffect(() => {
    // Simulate typing code
    const codeSnippets = [
      { code: "import { A-K } from '@project/core';", delay: 500 },
      { code: "function initializeProject() {", delay: 1000 },
      { code: "  console.log('Loading A-K Project...');", delay: 1500 },
      { code: "  return new Promise((resolve) => {", delay: 2000 },
      { code: "    setTimeout(() => resolve('Ready'), 2000);", delay: 2500 },
      { code: "  });", delay: 3000 },
      { code: "}", delay: 3500 },
      { code: "// Executing project initialization", delay: 4000 },
      { code: "initializeProject().then(status => {", delay: 4500 },
      { code: "  console.log(`A-K Project status: ${status}`);", delay: 4800 },
      { code: "});", delay: 5000 }
    ];

    codeSnippets.forEach((snippet, index) => {
      const codeElement = document.createElement('div');
      codeElement.className = 'code-line opacity-0';
      codeElement.innerHTML = `<span class="text-green-400">${snippet.code}</span>`;
      codeElement.style.animationDelay = `${snippet.delay}ms`;
      
      if (textRef.current) {
        textRef.current.appendChild(codeElement);
        codeLines.current.push(codeElement);
      }
    });

    return () => {
      codeLines.current.forEach(element => {
        element.remove();
      });
      codeLines.current = [];
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div 
        ref={textRef}
        className="code-block relative z-10 font-mono text-sm p-4 rounded-lg bg-black bg-opacity-50 max-w-md"
      >
        <div className="text-center mb-4 text-lg text-primary">A-K Project Loading</div>
      </div>
    </div>
  );
};

export default CodeLoadingAnimation;
