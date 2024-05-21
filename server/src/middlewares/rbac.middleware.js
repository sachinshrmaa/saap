export const requireTeacher = (req, res, next) => {
    if(!req.user){
        return res.status(401).json({ message: "User Not Logged In" });
    }

    if (req.user.role !== "TEACHER") {
        return res.status(403).json({ message: "Forbidden" });
    }

    next();
}