import React from 'react';

function Sidebar(){

    return(
        <div className='siderbar'>

            <div className='siderbar-header'> 
                <h1 >Se liga</h1>
                
            </div>

            <nav className='siderbar-nav'>
                <ul>
                    <li>Noticias</li>
                    <li>Análise</li>
                    <li>Painel</li>
                    <li>Sobre</li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar