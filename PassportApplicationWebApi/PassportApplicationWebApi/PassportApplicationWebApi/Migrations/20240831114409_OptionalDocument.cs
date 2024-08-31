using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PassportApplicationWebApi.Migrations
{
    /// <inheritdoc />
    public partial class OptionalDocument : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PassportApplications_Documents_DocumentsId",
                table: "PassportApplications");

            migrationBuilder.AlterColumn<int>(
                name: "DocumentsId",
                table: "PassportApplications",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_PassportApplications_Documents_DocumentsId",
                table: "PassportApplications",
                column: "DocumentsId",
                principalTable: "Documents",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PassportApplications_Documents_DocumentsId",
                table: "PassportApplications");

            migrationBuilder.AlterColumn<int>(
                name: "DocumentsId",
                table: "PassportApplications",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PassportApplications_Documents_DocumentsId",
                table: "PassportApplications",
                column: "DocumentsId",
                principalTable: "Documents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
