export type TestUser = ReturnType<typeof createTestUser>;
export function createTestUser() {
  const randomSuffix = `${Date.now()}_${Math.random().toString(36).slice(-4)}`;
  const email = `alexis_${randomSuffix}@test.com`;
  const password = ["A", "z", "7", "@", Math.random().toString(36).slice(-8)]
    .sort(() => 0.5 - Math.random())
    .join("");

  return {
    firstName: "Alexis",
    lastName: "Galeano",
    birthDate: "2000-01-01",
    streetName: "Main Street",
    postalCode: "12345",
    cityName: "Buenos Aires",
    stateName: "CABA",
    phoneNumber: "541112345678",
    email,
    password,
  };
}
