using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace IToolAPI.Repositories.Generic
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly ApplicationDbContext context;
        protected readonly DbSet<T> dbSet;

        public GenericRepository(ApplicationDbContext context)
        {
            this.context = context;
            dbSet = context.Set<T>();
        }

        public async Task<T> CreateAsync(T entity)
        {
            await dbSet.AddAsync(entity);
            await context.SaveChangesAsync();

            return entity;
        }

        public async Task DeleteAsync(object id)
        {
            T entity = await dbSet.FindAsync(new object[] { id });
            await DeleteAsync(entity);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync(string includeProperties="")
        {
            IQueryable<T> query = dbSet;

            return await IncludeProperties(query, includeProperties).ToListAsync();
        }

        public async Task<T> GetByIdAsync(Expression<Func<T, bool>> predicate = null, string includeProperties="")
        {
            var query = await IncludeProperties(dbSet, includeProperties).Where(predicate).FirstOrDefaultAsync();
            return query;
        }

        public IQueryable<T> IncludeProperties(IQueryable<T> query, string includeProperties)
        {
            foreach (var includeProperty in includeProperties.Split
            (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            return query;
        }

        public async Task UpdateAsync(T entity)
        {
            context.Update(entity);
            await context.SaveChangesAsync();
        }
    }
}
