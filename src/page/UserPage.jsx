import React, { useState, useEffect } from 'react'
import { Link, useParams} from 'react-router-dom';
import { getUser } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../utils/axios'

export const UserPage = () => {
    const [userRepo, setUserRepo] = useState([]);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const params = useParams();
    const owner = params.name
    useEffect(() => {
        dispatch(getUser(params))
        fetchRepo()
    }, []);

    

    const fetchRepo = async() =>{
        try{
          const { data } = await axios.get(`/users/${owner}/repos`);
          setUserRepo(data)
        
      }catch(err){
        console.log(err)
      }
      }
    return (
        <div className="container text-center">
            <div className="row">
                <div className="col">
                    <div className="card" style={{ maxWidth: "30rem", marginTop: '30px' }}>
                        <img src={`${user.avatar_url}`} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h4 className='card-title'>{user.name}</h4>
                            <p className="card-text"><small className='text-body-secondary'>Login: {user.login}</small></p>
                            <p className="card-text"><small className='text-body-secondary'>Followers: {user.followers}</small></p>
                            <p className="card-text">{user.bio}</p>
                        </div>
                    </div>
                </div>
                <div className="col" style={{overflow: 'auto', maxHeight: '100vh'}}>
                    {userRepo.map((repo)=>(
                        <Link to={`/${owner}/${repo.name}`}>
                        <div className="card">
                            <div className="card-body">
                            <h4 className='card-title'>{repo.name}</h4>
                            <p className="card-text"><small className='text-body-secondary'><a href={repo.html_url}
                            onClick={(e) => {
                                e.preventDefault(); 
                                window.location.href = repo.html_url; 
                              }}>{repo.html_url}</a></small></p>
                            <p className="card-text">{repo.description}</p>
                        </div>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
