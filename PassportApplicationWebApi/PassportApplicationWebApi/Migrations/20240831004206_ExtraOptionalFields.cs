using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PassportApplicationWebApi.Migrations
{
    /// <inheritdoc />
    public partial class ExtraOptionalFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PassportApplications_Documents_DocumentsId",
                table: "PassportApplications");

            migrationBuilder.DropForeignKey(
                name: "FK_PassportApplications_PaymentDetails_PaymentDetailsId",
                table: "PassportApplications");

            migrationBuilder.DropIndex(
                name: "IX_PassportApplications_PaymentDetailsId",
                table: "PassportApplications");

            migrationBuilder.AlterColumn<int>(
                name: "PaymentDetailsId",
                table: "PassportApplications",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "DocumentsId",
                table: "PassportApplications",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_PassportApplications_PaymentDetailsId",
                table: "PassportApplications",
                column: "PaymentDetailsId",
                unique: true,
                filter: "[PaymentDetailsId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_PassportApplications_Documents_DocumentsId",
                table: "PassportApplications",
                column: "DocumentsId",
                principalTable: "Documents",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PassportApplications_PaymentDetails_PaymentDetailsId",
                table: "PassportApplications",
                column: "PaymentDetailsId",
                principalTable: "PaymentDetails",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PassportApplications_Documents_DocumentsId",
                table: "PassportApplications");

            migrationBuilder.DropForeignKey(
                name: "FK_PassportApplications_PaymentDetails_PaymentDetailsId",
                table: "PassportApplications");

            migrationBuilder.DropIndex(
                name: "IX_PassportApplications_PaymentDetailsId",
                table: "PassportApplications");

            migrationBuilder.AlterColumn<int>(
                name: "PaymentDetailsId",
                table: "PassportApplications",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DocumentsId",
                table: "PassportApplications",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PassportApplications_PaymentDetailsId",
                table: "PassportApplications",
                column: "PaymentDetailsId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PassportApplications_Documents_DocumentsId",
                table: "PassportApplications",
                column: "DocumentsId",
                principalTable: "Documents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PassportApplications_PaymentDetails_PaymentDetailsId",
                table: "PassportApplications",
                column: "PaymentDetailsId",
                principalTable: "PaymentDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
