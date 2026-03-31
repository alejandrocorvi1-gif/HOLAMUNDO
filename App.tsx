/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function App() {
  const [mostrarCartel, setMostrarCartel] = useState(false);

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="text-center space-y-12">
        <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter italic">
          ¡Haz clic abajo!
        </h1>

        {/* Botón con estilo "dibujado" / Brutalista */}
        <motion.button
          whileHover={{ scale: 1.05, rotate: -1 }}
          whileTap={{ scale: 0.95, rotate: 1 }}
          onClick={() => setMostrarCartel(true)}
          className="relative group cursor-pointer"
        >
          <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          <div className="relative px-12 py-6 bg-yellow-400 border-4 border-black rounded-xl text-3xl font-black text-black uppercase tracking-widest">
            ¡PRESIONAME!
          </div>
        </motion.button>
      </div>

      {/* El "Cartel" (Modal) */}
      <AnimatePresence>
        {mostrarCartel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Fondo oscuro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMostrarCartel(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Cartel Hola Mundo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
              className="relative bg-white border-8 border-black p-12 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] max-w-sm w-full text-center"
            >
              <button
                onClick={() => setMostrarCartel(false)}
                className="absolute top-2 right-2 p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-black" />
              </button>
              
              <h2 className="text-6xl font-black text-blue-600 mb-4 drop-shadow-md">
                ¡HOLA MUNDO!
              </h2>
              <p className="text-slate-600 font-bold text-lg">
                ¡Lo lograste! Has creado tu primera aplicación interactiva.
              </p>
              
              <button
                onClick={() => setMostrarCartel(false)}
                className="mt-8 px-6 py-2 bg-black text-white font-bold uppercase hover:bg-slate-800 transition-colors"
              >
                Cerrar cartel
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
