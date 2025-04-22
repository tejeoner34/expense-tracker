import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { userSchemaSignUp } from '@/domain/schemas/user.schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, defaultCurrency } = userSchemaSignUp.parse(body);

    // Check if the user already exists
    const existingUserEmail = await db.user.findUnique({ where: { email } });
    if (existingUserEmail) {
      return NextResponse.json({ message: 'User already exists', user: null }, { status: 409 });
    }

    //Create a secure password
    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        defaultCurrency,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json({ user: rest });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Something went wrong', user: null }, { status: 500 });
  }
}
