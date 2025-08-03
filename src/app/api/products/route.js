import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function GET() {
  try {
    const result = await prisma.$queryRaw`
      SELECT
        p.product_id AS id,
        p.product_name AS name,
        p.product_brand AS brand,
        o.owner_name AS owner
      FROM Product p
      LEFT JOIN products_owners po ON p.product_id = po.products_id
      LEFT JOIN Owner o ON po.owners_id = o.id
    `;

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}