import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await handleLogin(email, password);
    setLoading(false);
    // Inputs are only cleared or kept depending on whether navigate happened
  };

  return (
    <div className="w-screen h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Dot-grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-30"
        style={{
          backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      ></div>
      {/* Single soft accent glow, top corner only */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <Card className="relative w-full max-w-[420px] mx-4 z-10 animate-slide-up shadow-xl border-t-4 border-t-primary">
        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          {/* Header */}
          <div className="mb-1 text-center">
            <div className="w-12 h-12 rounded-lg bg-primary text-white font-display italic font-bold text-xl flex items-center justify-center mx-auto mb-4">
              C
            </div>
            <h2 className="text-2xl font-bold text-text-main mb-1 tracking-tight">Crewline</h2>
            <p className="text-text-muted text-sm">Sign in to manage your team</p>
          </div>

          <div className="flex flex-col gap-5">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="anjali@gmail.com"
              required
            />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Anjali@123"
              required
            />
          </div>

          <Button type="submit" size="lg" className="mt-4" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;