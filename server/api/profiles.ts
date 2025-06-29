import type Profile from "~/Models/Profile";

const data: Profile[] = [
    {
        id: '1',
        display: true,
        name: 'Lola - Peluquería Canina',
        price: 25,
        age: 18,
        paymentMethods: ['cash', 'creditCard', 'bizum'],
        languages: ['spanish', 'english'],
        image: 'https://picsum.photos/seed/1/800/1000',
        description: 'Peluquería canina profesional con más de 15 años de experiencia. Especialistas en razas pequeñas y medianas. Servicio de recogida a domicilio.',
        location: { name: 'Centro Histórico, Málaga', lat: 36.7213, lng: -4.4217 },
        address: 'Calle Álamos 15, Local 3, 29012 Málaga',
        updatedAt: '2024-02-06'
    },
    {
        id: '2',
        display: true,
        name: 'Hotel Mascotas Happy Tails',
        price: 45,
        age: 21,
        paymentMethods: ['creditCard', 'bizum'],
        languages: ['spanish', 'english', 'germany'],
        image: 'https://picsum.photos/seed/2/800/1000',
        description: 'Residencia de lujo para mascotas con instalaciones climatizadas, cámaras 24/7 y personal veterinario permanente. Jardín amplio y actividades diarias.',
        location: { name: 'Teatinos, Málaga', lat: 36.7320, lng: -4.4753 },
        address: 'Avenida Plutarco 24, 29010 Málaga',
        updatedAt: '2024-02-05'
    },
    {
        id: '3',
        display: true,
        name: 'Veterinaria El Palo',
        price: 35,
        age: 50,
        paymentMethods: ['cash', 'creditCard', 'bizum'],
        languages: ['spanish', 'english', 'catalan'],
        image: 'https://picsum.photos/seed/3/800/1000',
        description: 'Clínica veterinaria con servicio de urgencias 24h. Equipamiento de última generación y especialistas en cirugía y traumatología animal.',
        location: { name: 'El Palo, Málaga', lat: 36.7214, lng: -4.3601 },
        address: 'Calle Jamaica 8, 29017 Málaga',
        updatedAt: '2024-02-04'
    },
    {
        id: '4',
        display: true,
        name: 'Paseador Profesional Carlos',
        price: 15,
        age: 30,
        paymentMethods: ['cash', 'bizum'],
        languages: ['spanish', 'english', 'germany'],
        image: 'https://picsum.photos/seed/4/800/1000',
        description: 'Servicio personalizado de paseos para perros. Grupos reducidos, rutas adaptadas y fotos diarias de la actividad. Experiencia con todas las razas.',
        location: { name: 'Huelin, Málaga', lat: 36.7141, lng: -4.4428 },
        address: 'Calle La Hoz 3, 29002 Málaga',
        updatedAt: '2024-02-04'
    },
    {
        id: '5',
        display: true,
        name: 'Tienda Natural PetFood',
        price: 30,
        age: 40,
        paymentMethods: ['cash', 'creditCard'],
        languages: ['spanish', 'english', 'italian'],
        image: 'https://picsum.photos/seed/5/800/1000',
        description: 'Alimentación natural y orgánica para mascotas. Asesoramiento nutricional personalizado y dietas BARF. Productos frescos y locales.',
        location: { name: 'Carretera de Cádiz, Málaga', lat: 36.7062, lng: -4.4405 },
        address: 'Avenida de Velázquez 126, 29004 Málaga',
        updatedAt: '2024-02-04'
    },
    {
        id: '6',
        display: true,
        name: 'Adiestramiento Canino K9',
        price: 40,
        age: 60,
        paymentMethods: ['cash', 'creditCard', 'bizum'],
        languages: ['spanish', 'english', 'germany'],
        image: 'https://picsum.photos/seed/6/800/1000',
        description: 'Centro de adiestramiento especializado en modificación de conducta. Clases individuales y grupales. Preparación para competiciones deportivas caninas.',
        location: { name: 'Ciudad Jardín, Málaga', lat: 36.7368, lng: -4.4063 },
        address: 'Camino de Suárez 92, 29011 Málaga',
        updatedAt: '2024-02-04'
    },
    {
        id: '7',
        display: true,
        name: 'Spa & Grooming VIP Pets',
        price: 70,
        age: 18,
        paymentMethods: ['creditCard'],
        languages: ['spanish', 'english', 'italian'],
        image: 'https://picsum.photos/seed/7/800/1000',
        description: 'Centro de belleza y bienestar para mascotas. Tratamientos spa, aromaterapia y peluquería de lujo. Productos premium y atención personalizada.',
        location: { name: 'Puerto de la Torre, Málaga', lat: 36.7447, lng: -4.4605 },
        address: 'Calle Navarro Ledesma 168, 29010 Málaga',
        updatedAt: '2024-02-04'
    },
    {
        id: '8',
        display: true,
        name: 'Centro Veterinario Costa del Sol',
        price: 50,
        age: 21,
        paymentMethods: ['creditCard', 'bizum'],
        languages: ['spanish', 'english', 'germany', 'italian'],
        image: 'https://picsum.photos/seed/8/800/1000',
        description: 'Centro veterinario especializado en animales exóticos. Servicio de hospitalización, laboratorio propio y diagnóstico por imagen avanzado. Equipo internacional.',
        location: { name: 'Torremolinos, Málaga', lat: 36.6240, lng: -4.4994 },
        address: 'Avenida de los Manantiales 12, 29620 Torremolinos',
        updatedAt: '2024-02-06'
    },
    {
        id: '9',
        display: true,
        name: 'Mascoting - Cuidado a Domicilio',
        price: 20,
        age: 18,
        paymentMethods: ['cash', 'bizum'],
        languages: ['spanish', 'catalan'],
        image: 'https://picsum.photos/seed/9/800/1000',
        description: 'Servicio de cuidadores profesionales a domicilio. Cuidamos de tu mascota en tu propia casa. Visitas diarias, administración de medicamentos y mucho mimo.',
        location: { name: 'Cerrado de Calderón, Málaga', lat: 36.7283, lng: -4.3921 },
        address: 'Calle Olmos 5, 29018 Málaga',
        updatedAt: '2024-02-05'
    },
    {
        id: '10',
        display: true,
        name: 'Fisioterapia Animal FisioVet',
        price: 45,
        age: 21,
        paymentMethods: ['creditCard', 'bizum'],
        languages: ['spanish', 'english', 'germany'],
        image: 'https://picsum.photos/seed/10/800/1000',
        description: 'Centro de rehabilitación y fisioterapia animal. Tratamientos de hidroterapia, electroestimulación y terapia manual. Especialistas en recuperación postoperatoria.',
        location: { name: 'La Paz, Málaga', lat: 36.7266, lng: -4.4394 },
        address: 'Avenida Juan Sebastián Elcano 157, 29017 Málaga',
        updatedAt: '2024-02-06'
    }
]

export default defineEventHandler((event): Profile[] => {
    return data
})