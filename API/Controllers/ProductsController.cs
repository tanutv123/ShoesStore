using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	public class ProductsController : BaseController
	{
		private readonly IGenericRepository<Product> _productRepository;
		private readonly IGenericRepository<ProductBrand> _productBrandRepository;
		private readonly IGenericRepository<ProductType> _productTypeRepository;
		private readonly IMapper _mapper;

		public ProductsController(
			IGenericRepository<Product> productRepository, 
			IGenericRepository<ProductBrand> productBrandRepository, 
			IGenericRepository<ProductType> productTypeRepository,
			IMapper mapper
			)
        {
			_productRepository = productRepository;
			_productBrandRepository = productBrandRepository;
			_productTypeRepository = productTypeRepository;
			_mapper = mapper;
		}

		[HttpGet]
		public async Task<ActionResult<IReadOnlyList<ProductsToReturnDto>>> GetProducts()
		{
			var spec = new ProductsWithTypesAndBrandsSpecification();
			var products = await _productRepository.GetAllWithSpecAsync(spec);
			return Ok(_mapper.Map<IReadOnlyList<ProductsToReturnDto>>(products));
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<ProductsToReturnDto>> GetProduct(int id)
		{
			var spec = new ProductsWithTypesAndBrandsSpecification(id);
			var product = await _productRepository.GetEntityWithSpec(spec);
			if (product == null) return NotFound(new ApiResponse(404));
			return _mapper.Map<ProductsToReturnDto>(product);
		}

		[HttpGet("brands")]
		public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
		{
			return Ok(await _productBrandRepository.GetAllAsync());
		}

		[HttpGet("types")]
		public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
		{
			return Ok(await _productTypeRepository.GetAllAsync());
		}
	}
}
