'use client';
import { useState, useEffect } from 'react';
import { projects, categories } from '@/data/projects';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/styles/ProjectBackgroundPattern.module.css';
import { ArrowRight } from 'lucide-react';

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!isMounted) return null;

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const getCardVariants = (index) => ({
    hidden: { 
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100,
      rotateY: index % 2 === 0 ? -10 : 10
    },
    show: { 
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  });

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Background Pattern */}
      <div className={styles.backgroundContainer} />
      
      <div className="relative z-10 container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Projelerimiz
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Mimari, iç mimari ve peyzaj alanlarında gerçekleştirdiğimiz seçkin projelerimiz
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2.5 rounded-full transition-all duration-300 text-sm font-medium ${
              selectedCategory === 'all'
                ? 'bg-white text-black shadow-lg'
                : 'bg-neutral-900/70 text-white hover:bg-neutral-800/70 shadow-md backdrop-blur-sm'
            }`}
          >
            Tümü
          </button>
          {Object.entries(categories).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-6 py-2.5 rounded-full transition-all duration-300 text-sm font-medium ${
                selectedCategory === key
                  ? 'bg-white text-black shadow-lg'
                  : 'bg-neutral-900/70 text-white hover:bg-neutral-800/70 shadow-md backdrop-blur-sm'
              }`}
            >
              {value}
            </button>
          ))}
        </motion.div>

        {/* Projects List */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto space-y-24"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={getCardVariants(index)}
                className="group"
              >
                <Link href={`/projects/${project.category}/${project.id}`}>
                  <div className={`flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}>
                    {/* Project Image */}
                    <div className="w-full md:w-1/2">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="w-full md:w-1/2 space-y-6">
                      <span className="inline-block px-3 py-1 text-sm rounded-full bg-neutral-900/70 backdrop-blur-sm text-white">
                        {categories[project.category]}
                      </span>
                      
                      <h2 className="text-3xl font-bold text-white group-hover:text-gray-200 transition-colors">
                        {project.title}
                      </h2>
                      
                      <p className="text-gray-400 text-lg group-hover:text-gray-300 transition-colors">
                        {project.description}
                      </p>

                      <div className="flex items-center text-white gap-2 pt-4">
                        <span className="font-medium">Detayları Gör</span>
                        <ArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsPage;