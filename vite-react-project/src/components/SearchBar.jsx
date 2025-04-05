import {  Input, Checkbox, Form } from 'antd';
import React  from "react";

export function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
  return (
    <Form layout="inline" style={{ marginBottom: '16px' }}>
      <Form.Item>
        <Input 
          placeholder="Ara..." 
          value={filterText} 
          onChange={(e) => onFilterTextChange(e.target.value)} 
        />
      </Form.Item>
      <Form.Item>
        <Checkbox 
          checked={inStockOnly} 
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        >
          Sadece stoktaki ürünleri göster
        </Checkbox>
      </Form.Item>
    </Form>
  );
}