"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Produk = {
    id: number;
    namaproduk: string;
    harga: number;
    quantity: number;
  };



export default function DeleteProduk(produk: Produk) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handledDelete(produkId: number) {

    setIsMutating(true);

    await fetch(`http://localhost:5000/produk/${produkId}`, {
      method: "DELETE",
    });

    setIsMutating(false);
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={handleChange}>
        Delete
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            apakah mau menghapus data ini {produk.namaproduk} ?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Tutup
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handledDelete(produk.id)}
                className="btn btn-primary"
              >
                hapus
              </button>
            ) : (
              <button type="button" className="btn loading">
                Sedang Menghapus...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}