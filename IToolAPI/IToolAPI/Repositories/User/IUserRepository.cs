using IToolAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Data
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetByUsername(string email);
        User GetById(int id);
    }
}
