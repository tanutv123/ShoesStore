using API.Dtos;
using API.Errors;
using API.Helpers;
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
		public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts(
			[FromQuery] ProductParamsSpecification productParams)
		{
			var spec = new ProductsWithTypesAndBrandsSpecification(productParams);
			var countSpec = new ProductWithFilterForCountSpecification(productParams);
			var totalItems = await _productRepository.CountAsync(countSpec);
			var products = await _productRepository.GetAllWithSpecAsync(spec);
			var data = _mapper.Map<IReadOnlyList<ProductToReturnDto>>(products);
			return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
		{
			var spec = new ProductsWithTypesAndBrandsSpecification(id);
			var product = await _productRepository.GetEntityWithSpec(spec);
			if (product == null) return NotFound(new ApiResponse(404));
			return _mapper.Map<ProductToReturnDto>(product);
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
