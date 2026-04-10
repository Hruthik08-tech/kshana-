import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NeatGradient } from '@firecms/neat';
import { useAuth } from '../context/AuthContext';
import { signupApi } from '../api/auth';

export default function SignUp() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!canvasRef.current) return;

        const config = {
            colors: [
                { color: '#cce0f5', enabled: true },
                { color: '#a1c9f2', enabled: true },
                { color: '#6ba4e9', enabled: true },
                { color: '#8bbef0', enabled: true },
                { color: '#4a8bdd', enabled: true },
                { color: '#e6f0fa', enabled: true },
            ],
            speed: 3,
            horizontalPressure: 3,
            verticalPressure: 4,
            waveFrequencyX: 2,
            waveFrequencyY: 3,
            waveAmplitude: 6,
            shadows: 2,
            highlights: 6,
            colorBrightness: 1.1,
            colorSaturation: 5,
            wireframe: false,
            colorBlending: 7,
            backgroundColor: '#f4f9ff',
            backgroundAlpha: 1,
            resolution: 1,
            flowDistortionA: 0.4,
            flowDistortionB: 10,
            flowScale: 3.3,
            flowEase: 0.37,
            flowEnabled: true,
        };

        const gradient = new NeatGradient({
            ref: canvasRef.current,
            ...config
        });

        return () => {
            gradient.destroy();
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const data = await signupApi({ name, email, password });
            login(data.token, data.user);
            navigate('/'); // redirect to protected home
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to sign up. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-cloud-white min-h-screen flex items-center justify-center p-6 font-body antialiased text-midnight-navy selection:bg-delight-blue selection:text-white overflow-hidden">
            <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(107,164,233,0.3)] flex flex-col md:flex-row w-full max-w-5xl overflow-hidden opacity-0 animate-fade-in-up border border-soft-breeze relative z-10">
                
                <div className="w-full md:w-1/2 relative overflow-hidden flex flex-col justify-center p-12 min-h-[400px]">
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover"></canvas>
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

                    <div className="relative z-10 flex flex-col items-start pointer-events-none">
                        <h2 className="display-2 text-4xl tracking-tight text-midnight-navy leading-tight mb-4 drop-shadow-md opacity-0 animate-fade-in-up delay-100">
                            Kshana 
                        </h2>
                        <p className="text-midnight-navy/80 text-base max-w-sm body drop-shadow-sm opacity-0 animate-fade-in-up delay-200">
                            "Make your moments now"
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-10 sm:p-14 flex flex-col justify-center bg-white z-10 relative">
                    <div className="mb-10 opacity-0 animate-fade-in-up delay-100">
                        <h1 className="display-2 text-4xl leading-tight mb-4 drop-shadow-md opacity-0 animate-fade-in-up delay-100">
                            Create Account
                        </h1>
                        <p className="text-base body leading-relaxed opacity-0 animate-fade-in-up delay-200">
                            Sign up to start saving your moments
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2.5 opacity-0 animate-fade-in-up delay-100">
                            <label htmlFor="name" className="block text-sm label uppercase tracking-wider">Full Name</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    id="name" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3.5 rounded-xl bg-cloud-white border-2 border-soft-breeze text-midnight-navy placeholder:text-midnight-navy/40 font-body" 
                                    placeholder="John Doe" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="space-y-2.5 opacity-0 animate-fade-in-up delay-200">
                            <label htmlFor="email" className="block text-sm label uppercase tracking-wider">Email</label>
                            <div className="relative">
                                <input 
                                    type="email" 
                                    id="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3.5 rounded-xl bg-cloud-white border-2 border-soft-breeze text-midnight-navy placeholder:text-midnight-navy/40 font-body" 
                                    placeholder="hello@company.com" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="space-y-2.5 opacity-0 animate-fade-in-up delay-300">
                            <label htmlFor="password" className="block text-sm label uppercase tracking-wider">Password</label>
                            <div className="relative">
                                <input 
                                    type="password" 
                                    id="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3.5 rounded-xl bg-cloud-white border-2 border-soft-breeze text-midnight-navy placeholder:text-midnight-navy/40 font-body" 
                                    placeholder="••••••••" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="pt-4 opacity-0 animate-fade-in-up delay-300">
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full py-4 px-6 rounded-xl text-white font-bold text-sm tracking-wide bg-gradient-to-r from-delight-blue to-deep-delight hover:from-deep-delight hover:to-delight-blue shadow-[0_10px_25px_-5px_rgba(107,164,233,0.5)] transform hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0 active:shadow-none disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                {isLoading ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                    
                    <div className="mt-8 text-center text-sm font-medium text-midnight-navy/60 opacity-0 animate-fade-in-up delay-300">
                        Already have an account? <Link to="/signin" className="font-bold text-delight-blue font-body hover:text-deep-delight transition-colors">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
