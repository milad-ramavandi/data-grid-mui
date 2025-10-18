

const api = async (url:string, options?:RequestInit) => {
  const res = await fetch(`${import.meta.env.VITE_PUBLIC_URL}${url}`, options);
  const data = await res.json();
  return data
}

export default api