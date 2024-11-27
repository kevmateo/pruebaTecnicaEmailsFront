'use client';

import { getCorreos, getCorreosFiltrados } from "@/peticiones";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CrearCorreo, FilaTabla } from "..";
import { CreateUser } from "../crearUser/CreateUser";

export const Tabla = () => {
  const [correos, setCorreos] = useState<any[]>([]);
  const [totalEmails, setTotalEmails] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [abrirCrearCorreo, setAbrirCrearCorreo] = useState(false);
  const [abrirCrearUsuario, setAbrirCrearUsuario] = useState(false);
  const [filtro, setFiltro] = useState("");

  const pageSize = 2;
  const searchParams = useSearchParams();
  const pageFromURL = parseInt(searchParams.get("page") || "1", 10);
  const filterFromURL = searchParams.get("content") || "";

  const handleAbrirCrearCorreo = () => setAbrirCrearCorreo(true);
  const handleCerrarCrearCorreo = () => setAbrirCrearCorreo(false);

  const handleAbrirCrearUsuario = () => setAbrirCrearUsuario(true);
  const handleCerrarCrearUsuario = () => setAbrirCrearUsuario(false);

  const fetchCorreos = async (page: number, currentFilter = filtro): Promise<void> => {
    const data: any = currentFilter
      ? await getCorreosFiltrados(page, pageSize, currentFilter)
      : await getCorreos(page, pageSize);

    setCorreos(data.emails);
    setTotalEmails(data.total);
    setCurrentPage(data.currentPage);
    setTotalPages(data.totalPages);

    // Actualizar la URL
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    if (currentFilter) {
      url.searchParams.set("content", currentFilter);
    } else {
      url.searchParams.delete("content");
    }
    window.history.replaceState({}, "", url.toString());
  };

  useEffect(() => {
    setFiltro(filterFromURL);
    fetchCorreos(pageFromURL, filterFromURL);
  }, [pageFromURL, filterFromURL]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchCorreos(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchCorreos(currentPage - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchCorreos(1, filtro);
    }
  };

  const clearFilter = () => {
    setFiltro("");
    fetchCorreos(1, "");
  };

  return (
    <div className=" mx-auto flex py-20">
      <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
        <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
          <div className="flex items-center justify-between ">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Bandeja de Correos</h3>
              <p className="text-slate-500">Revisa cada correo antes de editar</p>
            </div>
            <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
              <input
                type="text"
                placeholder="Buscar correo"
                className="rounded border border-slate-300 py-2.5 px-3 text-xs font-semibold text-slate-600 focus:outline-none"
                value={filtro}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <button
                className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600"
                type="button"
                onClick={clearFilter}
              >
                Limpiar filtro
              </button>
              <button
                className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-white bg-blue-500"
                type="button"
                onClick={handleAbrirCrearUsuario}
              >
                Crear usuario
              </button>
              <button
                className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white"
                type="button"
                onClick={handleAbrirCrearCorreo}
              >
                Crear Correo
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-auto p-3">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">Emisor</th>
                <th className="p-2 whitespace-nowrap">Receptor</th>
                <th className="p-2 whitespace-nowrap">Fecha de envio</th>
                <th className="p-2 whitespace-nowrap">Código SMTP</th>
                <th className="p-2 whitespace-nowrap">Contenido</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {correos.map((correo) => (
                <FilaTabla
                  key={correo.id}
                  sender={correo.sender.name}
                  recipient={correo.recipient.name}
                  sentDate={new Date(correo.sentDate).toLocaleString()}
                  smtpCode={correo.smtpCode}
                  content={correo.content}
                  senderEmail={correo.sender.email}
                  recipientEmail={correo.recipient.email}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-3">
          <p className="block text-sm text-slate-500">
            Página <strong>{currentPage}</strong> de {totalPages} (Total: {totalEmails} correos)
          </p>
          <div className="flex gap-1">
            <button
              className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600"
              type="button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <button
              className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600"
              type="button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
      {abrirCrearCorreo && <CrearCorreo onClose={handleCerrarCrearCorreo} />}
      {abrirCrearUsuario && <CreateUser onClose={handleCerrarCrearUsuario} />}
    </div>
  );
};
