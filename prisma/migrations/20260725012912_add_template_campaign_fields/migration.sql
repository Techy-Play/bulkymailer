-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_contactListId_fkey";

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "renderedHtml",
ADD COLUMN     "campaignName" TEXT NOT NULL DEFAULT 'Untitled Campaign',
ADD COLUMN     "htmlSnapshot" TEXT,
ADD COLUMN     "previewTextSnapshot" TEXT,
ALTER COLUMN "contactListId" DROP NOT NULL,
ALTER COLUMN "subject" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "description" TEXT,
ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "previewText" TEXT,
ADD COLUMN     "usageCount" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_contactListId_fkey" FOREIGN KEY ("contactListId") REFERENCES "ContactList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
