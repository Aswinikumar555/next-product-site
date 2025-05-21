import { NextApiRequest, NextApiResponse } from 'next';
import smallData from '@/src/mock/small/products.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Get and normalize search query, default to empty string if not provided
    const searchQuery = ((req.query.search as string) || '').trim();
    
    // If no search query, return all data
    if (!searchQuery) {
      return res.status(200).json(smallData);
    }

    // Split into keywords and filter out empty strings
    const keywords = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
    
    // If no valid keywords after filtering, return all data
    if (keywords.length === 0) {
      return res.status(200).json(smallData);
    }
    
    // Filter products that match any keyword
    const filteredData = smallData.filter(product => {
      const name = product.name.toLowerCase();
      return keywords.some(keyword => name.includes(keyword));
    });
    
    return res.status(200).json(filteredData);
  } catch (error) {
    console.error('Error processing search request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}