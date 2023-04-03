import AddProduk from "./addProduk";
import DeleteProduk from "./deleteProduk";
import UpdateProduk from "./updateProduk";
type Produks = {
    id:number;
    namaproduk: string;
    harga: number;
    quantity: number;
}

async function getProduct() {
    const res = await fetch('http://localhost:5000/produk', {
        cache: "no-store",
    });
    return res.json();
}

export default async function ProdukList() {
    const produk: Produks[] = await getProduct();
    return (
        <div className= "py-10 px-10">
            <center><h2>Data Barang Playstation</h2></center>
            <div className="py-2">
                <AddProduk />
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama Produk</th>
                        <th>Harga</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {produk.map((produk, index)=>(
                        <tr key={produk.id}>
                            <td>{index + 1}</td>
                            <td>{produk.namaproduk}</td>
                            <td>{produk.harga}</td>
                            <td>{produk.quantity}</td>
                            <td>
                                <UpdateProduk {...produk}/>
                                <DeleteProduk {...produk}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
           
            
        </div>
    );
  }