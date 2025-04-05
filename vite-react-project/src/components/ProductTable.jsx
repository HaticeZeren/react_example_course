import { Table } from 'antd';
import React from "react";

export function ProductTable({ products, filterText, inStockOnly , pageSize, currentPage, onPageChange, onPageSizeChange}) {
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(filterText.toLowerCase()) && 
    (!inStockOnly || product.stocked)
  );

  const columns = [
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'İsim',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => record.stocked ? text : <span style={{ color: 'red' }}>{text}</span>
    },
    {
      title: 'Fiyat',
      dataIndex: 'price',
      key: 'price',
    }
  ];

  return <Table 
  dataSource={filteredProducts} 
  columns={columns} 
  rowKey="name"  
  pagination={{
    current: currentPage, 
        pageSize: pageSize,
        onChange: onPageChange, // Sayfa numarasını günceller
        onShowSizeChange: (current, size) => onPageSizeChange(size), // Sayfa boyutunu değiştirir
        showSizeChanger: true, // Sayfa boyutunu değiştirme butonunu gösterir
        pageSizeOptions: ['5', '10', '20'], // Sayfa boyutu seçenekleri
  }}  />;
}