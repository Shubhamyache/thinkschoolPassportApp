using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PassportApplicationWebApi.Migrations
{
    /// <inheritdoc />
    public partial class complaintEditupdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PassportNumberorApplicationNuber",
                table: "Complaints",
                newName: "PassportNumberOrApplicationNumber");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PassportNumberOrApplicationNumber",
                table: "Complaints",
                newName: "PassportNumberorApplicationNuber");
        }
    }
}
