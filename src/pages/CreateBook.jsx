
import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBook = () => {
const [title,setTitle] = useState('');
const [author,setAuthor] = useState('');
const [year_of_publication,setYear_of_publication] = useState('');
const [loading,setLoading] = useState(false);
const navigate =useNavigate();
const {enqueueSnackbar}= useSnackbar()


// handling save book
const handleSaveBook =()=>{
    const data = {
        title,
        author,
        year_of_publication
    };

    setLoading(true)
    // post request
    axios.post('https://book_api.onrender.com:3001/api/post',data)
    .then(()=>{
        setLoading(false)
        enqueueSnackbar('Book created successfully',{variant:'success'})
        navigate('/')
    })
    .catch((error)=>{
        setLoading(false);
        alert('An error happened, Please Check console');
        enqueueSnackbar('Error',{variant:'error'})
        console.log(error)
    })
}
    return (
        <div className="p-4">
            <BackButton/>
            <div className="text-3xl my-4">
          <h1>Create Book</h1>
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

            <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>Save</button>

          </div>
            </div>

        </div>
    )
        
   
}


export default CreateBook;