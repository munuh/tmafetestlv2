'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProfile } from '../api/auth';


export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getProfile(token);
        setProfile(data);
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');

        const productData = await res.json();
        setProducts(productData);

      } catch (err) {
        setError('Failed to load profile');
        localStorage.removeItem('token');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10" style={{ backgroundImage: "url('/tmaoffice.jpg')"}}>  
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">  
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">Profile</h1>  
      {profile && (
        <>
        <div className="space-y-4 text-gray-800 text-base">  
          <p><span className="font-semibold">Name:</span> {profile.name}</p>
          <p><span className="font-semibold">Email:</span> {profile.email}</p>
          <p><span className="font-semibold">Role:</span> {profile.role}</p>
        </div>

        <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-blue-500 pb-1">
            Product List
        </h2>

        <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full border border-gray-300 text-sm text-left bg-white">
            <thead className="bg-blue-600 text-white">
                <tr>
                <th className="px-4 py-2 border border-blue-700"># ID</th>
                <th className="px-4 py-2 border border-blue-700">Product Name</th>
                <th className="px-4 py-2 border border-blue-700">Brand</th>
                <th className="px-4 py-2 border border-blue-700">Owner</th>
                </tr>
            </thead>
            <tbody>
                {products.map((p, index) => (
                <tr key={p.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white hover:bg-blue-100"}>
                    <td className="px-4 py-2 border border-gray-300 text-gray-700">{p.id}</td>
                    <td className="px-4 py-2 border border-gray-300 text-gray-800 font-medium">{p.name}</td>
                    <td className="px-4 py-2 border border-gray-300 text-gray-700">{p.brand}</td>
                    <td className="px-4 py-2 border border-gray-300 text-gray-700">{p.owner}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div> 
            </div>
            </>

      )}
    </div>
  </div>
  );
}