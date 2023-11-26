using Core.Entities;
using Core.Specification;

namespace Core.Interfaces
{
	public interface IGenericRepository<T> where T : BaseEntity
	{
		Task<T> GetByIdAsync(int id);
		Task<IReadOnlyList<T>> GetAllAsync();
		Task<T> GetEntityWithSpec(ISpecification<T> spec);
		Task<IReadOnlyList<T>> GetAllWithSpecAsync(ISpecification<T> spec);
		Task<int> CountAsync(ISpecification<T> spec);
	}
}
