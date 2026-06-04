import About from '../models/About.js';

const getDefaultAboutData = () => ({
  bio: 'Passionate developer with experience in building web applications.',
  profileImage: '',
  experiences: [],
  educations: [],
  skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
  contactDetails: {}
});

export const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    
    if (!about) {
      about = await About.create(getDefaultAboutData());
    }
    
    res.json(about);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    
    if (!about) {
      about = await About.create(req.body);
    } else {
      about = await About.findByIdAndUpdate(
        about._id,
        req.body,
        { new: true, runValidators: true }
      );
    }
    
    res.json(about);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
