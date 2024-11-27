'use client'

import { useState } from "react";
import { Overlay, Select } from ".."
import { postCrearCorreo } from "@/peticiones";

interface Props {
  onClose: () => void;
}

export const CrearCorreo = ({ onClose }: Props) => {

  const [idEmisor, setIdEmisor] = useState<string>("");
  const [idReceptor, setIdReceptor] = useState<string>("");

  const handleSelectEmisor = (id: string) => {
    setIdEmisor(id);
  }

  const handleSelectReceptor = (id: string) => {
    setIdReceptor(id);
  }

  const generarCodigoSmtp = () => {
    return `${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}`;
  }

  const handleCrearCorreo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const datosNuevoCorreo = {
      senderId: Number(idEmisor),
      recipientId: Number(idReceptor),
      sentDate: new Date().toISOString(),
      smtpCode: generarCodigoSmtp().toString(),
      content: form.get("contenido") as string
    }
    console.log(datosNuevoCorreo);

    const data = await postCrearCorreo(datosNuevoCorreo);
    if (data) {
      onClose();
    }
  }

  return (
    <Overlay>
      <div
        className="bg-white flex flex-col rounded-[10px] shadow-2xl w-[457px] z-50 p-[20px]"
      >
        <div className="flex bg-transparent items-center justify-between pb-[20px]">
          <div className="flex items-center ">
            <span className="font-semibold text-xl mr-[10px]">Crear Correo</span>
          </div>
        </div>
        <div className="w-full h-px bg-light_gray " />
        <form className="mt-[30px]" onSubmit={handleCrearCorreo} >
          <section className="flex flex-col w-full gap-[30px] mb-[30px]">
            <div className="flex flex-col">
              <span className="font-semibold text-sm mb-[5px]">Usuarios</span>
              <div className="flex items-center gap-[15px]">
                <div className="flex flex-col w-[47%] ">
                  <label htmlFor="fechaInicioTentativa" className="text-sm mb-[5px] italic">Emisor</label>
                  <Select onSelect={handleSelectEmisor} />
                </div>
                <div className="flex flex-col w-[47%]">
                  <label htmlFor="fechaFinTentativa" className="text-sm mb-[5px] italic">Receptor</label>
                  <Select onSelect={handleSelectReceptor} />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="contenido" className="font-semibold text-sm mb-[5px]">Contenido *</label>
              <textarea
                name="contenido"
                className="bg-white text-black px-[10px] py-[5px] rounded-[5px] w-auto h-[105px] border border-gray focus:outline-none"
                placeholder="Agregue detalles sobre la tarea..."
                required
              ></textarea>

            </div>
          </section>
          <div className="w-full h-px bg-light_gray " />
          <section className="flex items-center justify-end pt-[20px] gap-[15px]">
            <button type="button" className=" btn-sin-fondo" onClick={onClose} >Cancelar</button>
            <button type="submit" className="btn-primary">Crear Tarea</button>
          </section>
        </form>
      </div>
    </Overlay>
  )
}