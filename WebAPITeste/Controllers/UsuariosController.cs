using WebAPITeste.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace GuaranyCalc.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly UsuariosTesteContext _context;
        // private readonly IEmailService _emailService;

        public UsuariosController(UsuariosTesteContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAction()
        {
            return Ok(_context.Usuarios.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var user = _context.Usuarios.Find(id);
                if (user == null)
                    return NotFound("Usuario nao encontrado.");
                return Ok(user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPost("remove/{id}")]
        public IActionResult Remove(int id)
        {
            try
            {
                var user = _context.Usuarios.Find(id);
                _context.Remove(user);
                _context.SaveChanges();
                return Ok("Usuário removido.");
            }
            catch (Exception e)
            {
                return NotFound(e);
            }
        }

        [HttpPost("add")]
        public IActionResult Add([FromBody] Usuario model)
        {
            try
            {
                IEnumerable<Usuario> findEquals = _context.Usuarios.Where(u => u.Email == model.Email);
                if (findEquals.Count() > 0)
                {
                    return Unauthorized("Já existe um usuário com este e-mail");
                }

                model.DataInclusao = DateTime.Now;
                model.DataAlteracao = DateTime.Now;
                _context.Usuarios.Add(model);

                _context.SaveChanges();

                return Ok(model);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost("update")]
        public IActionResult Update([FromBody] Usuario model)
        {

            var user = _context.Usuarios.Find(model.UsuarioId);
            if (user == null)
                throw new ArgumentException($"Nao foi possivel encontrar o usuario ${model.UsuarioId}");

            user.Nome = model.Nome;
            user.Senha = model.Senha;
            user.DataAlteracao = DateTime.Now;
            user.StatusUsuario = model.StatusUsuario;
            user.Regras = model.Regras;

            _context.Usuarios.Update(user);
            _context.SaveChanges();

            return Ok(user);
        }

    }
}