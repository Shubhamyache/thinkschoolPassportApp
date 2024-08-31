using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PassportApplicationWebApi.Migrations
{
    /// <inheritdoc />
    public partial class PaymentDetailsOptional : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.CreateIndex(
                name: "IX_PassportApplications_PaymentDetailsId",
                table: "PassportApplications",
                column: "PaymentDetailsId",
                unique: true,
                filter: "[PaymentDetailsId] IS NOT NULL");

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

            migrationBuilder.CreateIndex(
                name: "IX_PassportApplications_PaymentDetailsId",
                table: "PassportApplications",
                column: "PaymentDetailsId",
                unique: true);

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
