using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace IToolAPI.Repositories.Generic
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T> GetByIdAsync(Expression<Func<T, bool>> predicate, string includeProperties="");
        Task<IEnumerable<T>> GetAllAsync(string includeProperties="");
        Task<T> CreateAsync(T entity);
        Task DeleteAsync(object id);
        Task UpdateAsync(T entity);
    }
}
