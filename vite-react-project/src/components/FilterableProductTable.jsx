import {SearchBar} from './SearchBar';
import {ProductTable} from './ProductTable';
import { Card } from 'antd';
import React, { useEffect, useState } from "react";
import axios from "axios"; 

export  function FilterableProductTable() {
  const [products, setProducts] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [pageSize, setPageSize] = useState(5); // Sayfa boyutunu state ile takip et
  const [currentPage, setCurrentPage] = useState(1); // Sayfa numarasını state ile takip et

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(response => {
        // Veriyi işleyerek sadece gerekli alanları alıyoruz
        const fetchedProducts = response.data.map(product => ({
          category: product.category,
          price: `₺${product.price}`,
          stocked: product.rating.count > 0, // Stok durumu burada örnek olarak rating.count ile belirlendi
          name: product.title
        }));
        setProducts(fetchedProducts);
      })
      .catch(error => console.error("Veri çekme hatası:", error));
  }, []);

  return (
    <Card title="Ürün Listesi" bordered={false} style={{ width: '80%', margin: '20px auto' }}>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText} 
        onInStockOnlyChange={setInStockOnly} 
      />
      <ProductTable 
        products={products} 
        filterText={filterText}
        inStockOnly={inStockOnly} 
        pageSize={pageSize} 
        currentPage={currentPage}
        onPageChange={setCurrentPage} 
        onPageSizeChange={setPageSize} 
      />
    </Card>
  );
}