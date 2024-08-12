export const corsOptions = {
    origin:['http://localhost','http://localhost:5173'],
    allowMethods: ['GET','POST','PATCH','DELETE','OPTIONS','PUT'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials:true,
} 