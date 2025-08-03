'use client'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../api/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('john@mail.com');
  const [password, setPassword] = useState('changeme');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.access_token);
      router.push('/profile');
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return ( 
    <div
  className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center px-4"
  style={{ backgroundImage: "url('/tmaoffice.jpg')" }}
>

  <form
  onSubmit={handleSubmit}
  className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" 
>
  <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Login</h1>  
  
  {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>} 
  
  <div className="mb-4">
    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
      Email
    </label>
    <input
      id="email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"  
      required
    />
  </div>

  <div className="mb-6">
    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
      Password
    </label>
    <input
      id="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"  
      required
    />
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow-md transition" 
  >
    Login
  </button>
</form>


  </div>
  );
}