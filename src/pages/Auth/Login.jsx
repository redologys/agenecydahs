import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader2, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      // Login successful, redirect handled by App state or here
      navigate('/');
    } catch (err) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#05070a]">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
         <div className="w-full max-w-sm space-y-8">
            <div className="text-center">
               <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#B29600] mb-4 shadow-lg shadow-[#FFD700]/20">
                  <span className="text-black font-bold text-xl">D</span>
               </div>
               <h2 className="text-3xl font-display font-bold text-white mb-2">Welcome Back</h2>
               <p className="text-text-secondary">Sign in to your dashboard to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-sm font-medium text-text-secondary">Email Address</label>
                     <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                        <input 
                           type="email" 
                           required
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="input-field pl-10 w-full"
                           placeholder="admin@dominion.agency"
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-sm font-medium text-text-secondary">Password</label>
                     <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                        <input 
                           type={showPassword ? "text" : "password"}
                           required
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           className="input-field pl-10 pr-10 w-full"
                           placeholder="Enter your password"
                        />
                         <button 
                           type="button"
                           onClick={() => setShowPassword(!showPassword)}
                           className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                        >
                           {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                     </div>
                  </div>
               </div>

               <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer group">
                     <input type="checkbox" className="rounded border-white/20 bg-white/5 checked:bg-primary text-black focus:ring-primary checkbox-primary" />
                     <span className="text-text-secondary group-hover:text-white transition-colors">Remember me</span>
                  </label>
                  <a href="#" className="text-primary hover:text-primary-light font-medium hover:underline">Forgot password?</a>
               </div>

               {error && (
                 <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center">
                   {error}
                 </div>
               )}

               <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary w-full py-3 text-base flex justify-center items-center gap-2"
               >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : 'Sign In'}
               </button>
            </form>
            
            <p className="text-center text-xs text-text-muted mt-8">
              &copy; 2025 Dominion Agency. All rights reserved.
            </p>
         </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex w-1/2 bg-[#0b0f19] relative overflow-hidden items-center justify-center">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent"></div>
         
         <div className="relative z-10 p-12 max-w-lg text-center">
            <h2 className="text-4xl font-display font-bold text-white mb-6 leading-tight">
               Manage your agency with <span className="text-gradient">precision</span> and <span className="text-gradient">style</span>.
            </h2>
            <p className="text-text-secondary text-lg">
               The all-in-one dashboard for modern marketing teams. Track clients, manage tasks, and secure credentials in one premium interface.
            </p>
         </div>
         
         {/* Decorative Circles */}
         <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none"></div>
         <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[96px] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Login;
