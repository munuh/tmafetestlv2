const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(email, password) { 
  const formData = new URLSearchParams();
  formData.append('email', email);
  formData.append('password', password);

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',  
    },
    body: formData.toString(), 
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return await response.json();
}
 
export async function getProfile(token) {
  const response = await fetch(`${API_URL}/users/1`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  return await response.json();
}