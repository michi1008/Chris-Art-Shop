import React from 'react';
import './ProductListScreen.css';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from '../../slices/productsApiSlice';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Paginate from '../../components/Paginate';

const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <section className='admin-products'>
      <h1 className='admin-products-title'>Products</h1>
      <button className='admin-create-btn' onClick={createProductHandler}>
        <FaPlus /> Create Product
      </button>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          <table className='product-list-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>IMAGE</th>
                <th>PRICE</th>
                <th>SIZE</th>
                <th>DESC</th>
                <th>STYLE</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>
                    <img
                      className='admin-product-image'
                      src={product.image}
                      alt='art'
                    />
                  </td>
                  <td>${product.price}</td>
                  <td>{product.size}</td>
                  <td>{product.desc}</td>
                  <td>{product.style}</td>
                  <td>{product.category}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <button className='admin-products-edit'>
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className='admin-products-trash'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </section>
  );
};

export default ProductListScreen;
