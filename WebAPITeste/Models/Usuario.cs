using System;
using System.Collections.Generic;

#nullable disable

namespace WebAPITeste.Models
{
    public partial class Usuario
    {
        public int UsuarioId { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public DateTime? DataInclusao { get; set; }
        public DateTime? DataAlteracao { get; set; }
        public bool? StatusUsuario { get; set; }
        public int? Regras { get; set; }
    }
}
