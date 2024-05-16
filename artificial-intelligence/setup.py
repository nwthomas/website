from setuptools import setup, find_packages

with open("requirements.txt", "r") as file:
    requirements = file.read().splitlines()

setup(
    name="nathan-website",
    version="0.0.0-alpha",
    packages=find_packages(),
    install_requires=requirements,
)
