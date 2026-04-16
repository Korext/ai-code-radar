from setuptools import setup, find_packages

setup(
    name="korext-radar-data",
    version="1.0.0",
    description="SDK for querying the AI Code Radar public API.",
    author="Korext",
    author_email="tombruno@korext.com",
    packages=find_packages(),
    install_requires=[
        "requests>=2.25.1"
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: Apache Software License",
    ],
)
