using BEComentarios;
using Microsoft.EntityFrameworkCore;

var b = WebApplication.CreateBuilder(args);
// Add services to the container.

b.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
b.Services.AddEndpointsApiExplorer();
b.Services.AddSwaggerGen();
var connectionString = "Server=localhost;Database=DbComentarios;Uid=root;Pwd=muyiga128;";
b.Services.AddDbContext<AplicationDbContext>(options =>
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
    );

b.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:4200")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = b.Build();

app.UseCors("CorsPolicy");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
