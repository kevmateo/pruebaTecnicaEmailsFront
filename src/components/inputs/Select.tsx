'use client'

import { getUsers } from "@/peticiones";
import { useEffect, useState } from "react";

interface Props {
  onSelect: (id: string) => void;
}

export const Select = ({ onSelect }: Props) => {

  const [usuarios, setUsuarios] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const data = await getUsers();
      setUsuarios(data);
    };

    fetchUsuarios();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    onSelect(selectedId);
  }

  return (
    <>
      <select
        id="user-select"
        name="user"
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={handleChange}
      >
        <option value="">Selecciona un usuario</option>
        {usuarios.map((usuario) => (
          <option key={usuario.id} value={usuario.id}>
            {usuario.name} - {usuario.email}
          </option>
        ))}
      </select>
    </>
  )
}