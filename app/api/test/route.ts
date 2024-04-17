import { NextResponse } from 'next/server'
import pool from '../libs/mysql'

const GET = async () => {
  try {
    const db = await pool.getConnection()

    const query2 = 'SELECT * FROM vote_lists'
    const [rows2] = await db.execute(query2, [])

    db.release()
    return NextResponse.json([rows2])
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      { status: 500 },
    )
  }
}

export default GET
