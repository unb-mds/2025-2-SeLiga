import React from 'react';
import '../styles/sobre.css'; 

function MembroCard({ nome, papeis, imageUrl }) {

    const papelPrincipal = papeis && papeis.length > 0 ? papeis[0] : null;

    const papeisSecundarios = papeis && papeis.length > 1 ? papeis.slice(1) : [];

    return (
        <div className="membro-card"> 

            {/* Elemento decorativo de fundo */}
            <div className="membro-card-background-deco"></div>

            {/* Foto Principal */}
            <div className="membro-foto" style={{ backgroundImage: `url(${imageUrl})` }}></div>

            {/* Nome do Membro */}
            <h3 className="membro-nome">{nome}</h3>

            {/* Papel Principal  */}
            {papelPrincipal && (
                <div className="papel-principal-tag">
                    {papelPrincipal}
                </div>
            )}

            <div className="membro-role-categoria"></div>

            {/* Papéis Secundários*/}
            <div className="papeis-secundarios-container">
                {papeisSecundarios.map((papel) => (
                    <span key={papel} className="papel-secundario-tag">
                        {papel}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default MembroCard;