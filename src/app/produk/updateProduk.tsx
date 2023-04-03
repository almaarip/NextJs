"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Produk = {
  id: number;
  namaproduk: string;
  harga: number;
  quantity: number;
};

export default function UpdateProduct(produk: Produk) {
    const [namaproduk, setNamaproduk] = useState("");
    const [harga, setHarga] = useState("");
    const [quantity, setQuantity] = useState("");
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
  

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch(`http://localhost:5000/produk/${produk.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        namaproduk: namaproduk,
        harga: harga,
        quantity: quantity,
      }),
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
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Ubah data
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Ubah data {produk.namaproduk}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Nama Produk</label>
              <input
                type="text"
                value={namaproduk}
                onChange={(e) => setNamaproduk(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nama Produk"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Harga</label>
              <input
                type="text"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Harga"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Quantity</label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Quantity"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Tutup
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Update data
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}