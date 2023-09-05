
import { useState,useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from 'axios';
import { useNavigate,useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
const [title,setTitle] = useState('');
const [author,setAuthor] = useState('');
const [year_of_publication,setYear_of_publication] = useState('');
const [loading,setLoading] = useState(false);
const navigate = useNavigate();
const {id}= useParams();
const {enqueueSnackbar}= useSnackbar()

useEffect(() => {
setLoading(true)
axios.get(`https://book_api.onrender.com:3001/api/book/${id}`)
.then((response)=>{
console.log(response.data)
setAuthor(response.data.author)
setYear_of_publication(response.data.year_of_publication)
setTitle(response.data.title)
setLoading(false)
})
.catch((error)=>{
    setLoading(false)
    alert('An error happened, Please check console');
    console.log(error)
})

}, [])

// handling save book
const handleEditBook =()=>{
    const data = {
        title,
        author,
        year_of_publication
    };

    setLoading(true)
    // post request
    axios.put(`https://book_api.onrender.com:3001/api/book/${id}`,data)
    .then(()=>{
        setLoading(false)
        enqueueSnackbar('Book Edited successfully',{variant:'success'})
        navigate('/')
    })
    .catch((error)=>{
        setLoading(false);
        enqueueSnackbar('Error while editing Book',{variant:'error'})
        console.log(error)
    })
}
    return (
        <div className="p-4">
            <BackButton/>
            <div className="text-3xl my-4">
          <h1>Edit Book</h1>
          {loading?(<Spinner/>): ''}
          <div className="fle flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
            <div className="my-4 ">
                <label className='text-xl mr-4 text-gray-500'>Title</label>
                <input 
                type='text' value ={title}
                onChange={(e)=>setTitle(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
                />
            </div>

            <div className="my-4 ">
                <label className='text-xl mr-4 text-gray-500'>Author</label>
                <input 
                type='text' value ={author}
                onChange={(e)=>setAuthor(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
                />
            </div>

            <div className="my-4 ">
                <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                <input 
                type='text' value ={year_of_publication}
                onChange={(e)=>setYear_of_publication(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
                />
            </div>

            <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>

          </div>
            </div>

        </div>
    )
        
   
}


export default EditBook;
