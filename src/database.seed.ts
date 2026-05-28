import { AppDataSource } from './data-source';

async function seedDatabase() {
  console.log('🌱 Starting database seed...');

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    // Example: Seed users
    // const userRepository = AppDataSource.getRepository(User);
    // const existingUsers = await userRepository.count();

    // if (existingUsers === 0) {
    //   const users = userRepository.create([
    //     { email: 'admin@example.com', name: 'Admin User' },
    //     { email: 'user@example.com', name: 'Regular User' },
    //   ]);
    //   await userRepository.save(users);
    //   console.log('✅ Users seeded successfully');
    // } else {
    //   console.log('⏭️  Users already exist, skipping seed');
    // }

    console.log('✅ Database seed completed successfully');
  } catch (error) {
    console.error('❌ Error during database seed:', error);
    process.exit(1);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

seedDatabase();
